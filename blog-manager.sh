#!/bin/bash

POSTS_DIR="/home/masih/My_freelance_website/app/blog/posts"
README_PATH="/home/masih/Desktop/migrate/Projects/A-Modular-Kingdom/README.md"

# Create new blog post
new_post() {
    if [ -z "$1" ] || [ -z "$2" ]; then
        echo "Usage: $0 new \"Post Title\" filename"
        exit 1
    fi
    
    title="$1"
    filename="$2"
    date=$(date +%Y-%m-%d)
    
    cat > "$POSTS_DIR/$filename.md" << EOF
---
title: "$title"
date: "$date"
readTime: "5 min read"
tags: ["Programming", "AI"]
---

# $title

Write your blog content here in markdown...

## Features

- Feature 1
- Feature 2
- Feature 3

## Code Example

\`\`\`javascript
console.log("Hello World!");
\`\`\`

## Conclusion

Your conclusion here...
EOF

    echo "✅ Created new blog post: $filename.md"
}

# Sync README to A-Modular-Kingdom post
sync_readme() {
    if [ ! -f "$README_PATH" ]; then
        echo "❌ README.md not found at $README_PATH"
        exit 1
    fi
    
    cat > "$POSTS_DIR/a-modular-kingdom.md" << EOF
---
title: "🏰 A-Modular-Kingdom"
subtitle: "The Foundation for AI-Powered Multi-Agent Systems"
date: "2025-08-17"
readTime: "8 min read"
tags: ["AI", "Multi-Agent Systems", "RAG", "MCP", "Python"]
---

$(cat "$README_PATH")
EOF
    
    echo "✅ README.md synced to A-Modular-Kingdom blog post"
}

# Show help
show_help() {
    echo "Blog Manager - Easy markdown blog posting"
    echo ""
    echo "Commands:"
    echo "  new \"Title\" filename  - Create new blog post"
    echo "  sync                  - Sync README.md to A-Modular-Kingdom post"
    echo "  list                  - List all blog posts"
    echo "  edit filename         - Edit blog post with nano"
    echo ""
    echo "Examples:"
    echo "  $0 new \"My New Post\" my-new-post"
    echo "  $0 sync"
    echo "  $0 edit a-modular-kingdom"
}

# List posts
list_posts() {
    echo "📝 Blog Posts:"
    ls -la "$POSTS_DIR"/*.md | awk '{print "  " $9}' | sed 's/.*\///' | sed 's/\.md$//'
}

# Edit post
edit_post() {
    if [ -z "$1" ]; then
        echo "Usage: $0 edit filename"
        exit 1
    fi
    
    filename="$1"
    if [ ! -f "$POSTS_DIR/$filename.md" ]; then
        echo "❌ Post not found: $filename.md"
        exit 1
    fi
    
    nano "$POSTS_DIR/$filename.md"
    echo "✅ Edited $filename.md"
}

# Main command handler
case "$1" in
    "new")
        new_post "$2" "$3"
        ;;
    "sync")
        sync_readme
        ;;
    "list")
        list_posts
        ;;
    "edit")
        edit_post "$2"
        ;;
    *)
        show_help
        ;;
esac