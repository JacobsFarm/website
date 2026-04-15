import os
import json

# ==========================================
#               PARAMETERS
# ==========================================
# Relative path to the folder where all translations are stored.
# Assuming you run this script from the root of your project.
MESSAGES_DIR = "./messages"

# The base language that acts as the template (must be an existing folder).
# For example "nl" or "en".
REFERENCE_LANG = "en" 

# A list of target languages you want to split into smaller files.
# Make sure the corresponding large JSON files exist (e.g., de.json, fr.json).
TARGET_LANGS = ["nl", "de", "es", "pt", "fr", "pl", "it", "ro", "dn"]
# ==========================================

def split_messages():
    # Build the path for the reference directory
    reference_dir = os.path.join(MESSAGES_DIR, REFERENCE_LANG)

    # 1. Check if the reference directory exists
    if not os.path.exists(reference_dir):
        print(f"❌ Error: Reference directory '{reference_dir}' does not exist.")
        print(f"   Make sure the REFERENCE_LANG is set correctly and the folder exists.")
        return

    # Loop through each target language provided in the list
    for target_lang in TARGET_LANGS:
        print(f"\n==================================================")
        print(f"   Processing Target Language: {target_lang.upper()}")
        print(f"==================================================")
        
        target_file = os.path.join(MESSAGES_DIR, f"{target_lang}.json")
        target_dir = os.path.join(MESSAGES_DIR, target_lang)

        # 2. Check if the large translation file exists for this specific language
        if not os.path.exists(target_file):
            print(f"❌ Error: Large target file '{target_file}' does not exist.")
            print(f"   Skipping language '{target_lang}'...")
            continue

        # Read the large translated file (e.g., de.json)
        print(f"📂 Reading large translation file: {target_file}")
        with open(target_file, 'r', encoding='utf-8') as f:
            try:
                target_data = json.load(f)
            except json.JSONDecodeError:
                print(f"❌ Error: The file {target_file} is not valid JSON.")
                print(f"   Skipping language '{target_lang}'...")
                continue

        # 3. Create the target directory (e.g., /de/) if it doesn't exist
        if not os.path.exists(target_dir):
            os.makedirs(target_dir)
            print(f"📁 Created new target directory: {target_dir}")

        # 4. Loop through all small files in the reference directory (e.g., /nl/)
        files_processed = 0
        total_missing_keys = 0

        for filename in os.listdir(reference_dir):
            if not filename.endswith('.json'):
                continue

            ref_filepath = os.path.join(reference_dir, filename)
            target_filepath = os.path.join(target_dir, filename)

            # Read the small reference file (template)
            with open(ref_filepath, 'r', encoding='utf-8') as f:
                ref_data = json.load(f)

            new_target_data = {}
            missing_keys = []

            # 5. Map keys from the template to the translations in the target language
            for key in ref_data.keys():
                if key in target_data:
                    # If the translation exists in the large target JSON, use it
                    new_target_data[key] = target_data[key]
                else:
                    # If the translation is missing, fallback to the reference language
                    new_target_data[key] = ref_data[key]
                    missing_keys.append(key)
                    total_missing_keys += 1

            # 6. Save the new, small JSON file in the target directory
            with open(target_filepath, 'w', encoding='utf-8') as f:
                json.dump(new_target_data, f, ensure_ascii=False, indent=2)
            
            print(f"  ✅ Saved {filename} ({len(new_target_data)} keys).")
            
            # Print a warning if any keys were missing for this specific file
            if missing_keys:
                print(f"     ⚠️ Warning: {len(missing_keys)} keys missing. Kept original '{REFERENCE_LANG}' text.")
            
            files_processed += 1

        print(f"\n🎉 Finished splitting '{target_lang}'.")
        print(f"   Created/updated {files_processed} files.")
        if total_missing_keys > 0:
            print(f"   ⚠️ Total missing keys across all files: {total_missing_keys}")
        print(f"--------------------------------------------------\n")

if __name__ == "__main__":
    split_messages()
