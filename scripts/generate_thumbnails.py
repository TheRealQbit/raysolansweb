#!/usr/bin/env python3
"""
Image Thumbnail Generator
Generates two versions of all images in the assets subfolder:
- 1/4 scale with '_button' suffix
- 1/2 scale with '_small' suffix
"""

import os
from PIL import Image
import argparse
from pathlib import Path

def process_image(image_path, output_dir=None):
    """
    Process a single image to create button and small versions
    
    Args:
        image_path (str): Path to the original image
        output_dir (str): Output directory (optional, defaults to same directory as input)
    """
    try:
        # Open the image
        with Image.open(image_path) as img:
            # Get original dimensions
            width, height = img.size
            
            # Get the file path components
            path_obj = Path(image_path)
            if output_dir:
                output_path = Path(output_dir)
            else:
                output_path = path_obj.parent
            
            # Extract filename without extension
            filename = path_obj.stem
            extension = path_obj.suffix
            
            # Create 1/4 scale version (button)
            button_width = width // 4
            button_height = height // 4
            button_img = img.resize((button_width, button_height), Image.Resampling.LANCZOS)
            button_filename = f"{filename}_button{extension}"
            button_path = output_path / button_filename
            button_img.save(button_path, quality=85, optimize=True)
            print(f"Created button version: {button_path}")
            
            # Create 1/2 scale version (small)
            small_width = width // 2
            small_height = height // 2
            small_img = img.resize((small_width, small_height), Image.Resampling.LANCZOS)
            small_filename = f"{filename}_small{extension}"
            small_path = output_path / small_filename
            small_img.save(small_path, quality=90, optimize=True)
            print(f"Created small version: {small_path}")
            
    except Exception as e:
        print(f"Error processing {image_path}: {str(e)}")

def is_image_file(filename):
    """Check if a file is an image based on its extension"""
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif', '.webp'}
    return Path(filename).suffix.lower() in image_extensions

def process_assets_folder(assets_path, recursive=True):
    """
    Process all images in the assets folder
    
    Args:
        assets_path (str): Path to the assets folder
        recursive (bool): Whether to process subfolders recursively
    """
    assets_dir = Path(assets_path)
    
    if not assets_dir.exists():
        print(f"Assets folder not found: {assets_path}")
        return
    
    # Find all image files
    if recursive:
        image_files = []
        for root, dirs, files in os.walk(assets_dir):
            for file in files:
                if is_image_file(file):
                    # Skip files that are already thumbnails
                    if not (file.endswith('_button.jpg') or file.endswith('_button.jpeg') or 
                           file.endswith('_button.png') or file.endswith('_small.jpg') or 
                           file.endswith('_small.jpeg') or file.endswith('_small.png')):
                        image_files.append(os.path.join(root, file))
    else:
        image_files = [f for f in assets_dir.iterdir() 
                      if f.is_file() and is_image_file(f.name) and 
                      not ('_button.' in f.name or '_small.' in f.name)]
    
    if not image_files:
        print("No image files found in assets folder")
        return
    
    print(f"Found {len(image_files)} image files to process...")
    
    # Process each image
    processed = 0
    skipped = 0
    
    for image_file in image_files:
        try:
            process_image(image_file)
            processed += 1
        except Exception as e:
            print(f"Skipped {image_file}: {str(e)}")
            skipped += 1
    
    print(f"\nProcessing complete!")
    print(f"Processed: {processed} images")
    print(f"Skipped: {skipped} images")

def main():
    parser = argparse.ArgumentParser(description='Generate thumbnail versions of images')
    parser.add_argument('--assets-path', '-a', 
                       default='public/assets',
                       help='Path to assets folder (default: public/assets)')
    parser.add_argument('--no-recursive', '-nr', 
                       action='store_true',
                       help='Do not process subfolders recursively')
    parser.add_argument('--single-image', '-i',
                       help='Process a single image file instead of the entire assets folder')
    
    args = parser.parse_args()
    
    if args.single_image:
        if os.path.exists(args.single_image):
            print(f"Processing single image: {args.single_image}")
            process_image(args.single_image)
        else:
            print(f"Image file not found: {args.single_image}")
    else:
        print(f"Processing assets folder: {args.assets_path}")
        process_assets_folder(args.assets_path, recursive=not args.no_recursive)

if __name__ == "__main__":
    main()