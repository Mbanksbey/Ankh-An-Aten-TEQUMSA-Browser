#!/usr/bin/env python3
"""
Generate PNG icons for the extension
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, output_path):
    """Create a simple icon with gradient and emoji"""
    # Create image with gradient background
    img = Image.new('RGB', (size, size))
    draw = ImageDraw.Draw(img)
    
    # Draw gradient-like background (simplified)
    for y in range(size):
        # Interpolate between two colors
        r = int(102 + (118 - 102) * y / size)
        g = int(126 + (75 - 126) * y / size)
        b = int(234 + (162 - 234) * y / size)
        draw.rectangle([0, y, size, y+1], fill=(r, g, b))
    
    # Try to add text (brain emoji representation as "T" for TEQUMSA)
    try:
        font_size = size // 2
        # Use default font
        draw.text((size//2, size//2), 'T', fill='white', anchor='mm', 
                 font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', font_size))
    except:
        # Fallback: draw a circle
        circle_size = size // 3
        draw.ellipse([size//2 - circle_size, size//2 - circle_size, 
                     size//2 + circle_size, size//2 + circle_size], 
                     fill='white')
    
    # Save
    img.save(output_path, 'PNG')
    print(f'Created {output_path}')

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    icons_dir = os.path.join(script_dir, '..', 'icons')
    
    create_icon(16, os.path.join(icons_dir, 'icon16.png'))
    create_icon(48, os.path.join(icons_dir, 'icon48.png'))
    create_icon(128, os.path.join(icons_dir, 'icon128.png'))
    
    print('All icons created successfully!')
