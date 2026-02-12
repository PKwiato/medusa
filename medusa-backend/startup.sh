#!/bin/sh
# We don't use -e here because we want to handle failures gracefully
# set -e 

# Path to the persistent flag file
FLAG_FILE="/app/data/.medusa_seeded_v5"

echo "Starting Medusa Setup..."

# Run migrations (always safe)
echo "Running migrations..."
npx medusa db:migrate

# Ensure admin user exists (run every time to be safe against volume de-sync)
echo "Ensuring admin user (admin@me.com) exists..."
npx medusa user --email admin@me.com --password password || echo "Admin user creation skipped (likely already exists)."

# Check if setup is needed
if [ ! -f "$FLAG_FILE" ]; then
    echo "First time setup (v2): Initializing data..."
    
    # Try to seed products (API key creation is now at the top of seed script)
    echo "Seeding database..."
    if npm run seed; then
        echo "Database seeded successfully."
    else
        echo "Warning: Seed command returned an error. This often happens if data already exists."
        echo "Since API Key creation is now prioritized, this might be fine."
        echo "Continuing to start the server anyway..."
    fi
    
    # Mark as setup complete
    mkdir -p /app/data
    touch "$FLAG_FILE"
    echo "Setup phase finished."
else
    echo "Skipping seeding (already marked as complete in /app/data)."
fi

echo "Final check: Starting server..."
npm run start
