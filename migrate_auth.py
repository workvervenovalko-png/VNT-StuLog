import os
import re

def migrate_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace import
    new_content = content.replace('@clerk/nextjs/server', '@/lib/auth-helpers')
    new_content = new_content.replace('import { currentUser } from "@clerk/nextjs/server";', 'import { getSession } from "@/lib/auth";')
    
    # Replace auth() with await auth()
    new_content = re.sub(r'const \{ (.*) \} = auth\(\)', r'const { \1 } = await auth()', new_content)
    
    # Replace user = await currentUser() with session = await getSession(); const user = session?.user;
    new_content = re.sub(r'const user = await currentUser\(\)', r'const session = await getSession(); const user = session?.user', new_content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Migrated: {file_path}")

def main():
    src_dir = 'src'
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                migrate_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
