# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal academic homepage for Pan Bikang (潘比康), a PhD student at ShanghaiTech University. The site is built using the "Prologue" template from HTML5 UP and features:

- Personal introduction and research interests in optimization and machine learning
- Publications list with conference papers (CVPR, NeurIPS, ICCV, etc.)
- Academic achievements and teaching assistant experience
- Contact information

## Architecture

The site is a static HTML/CSS/JavaScript website with the following structure:

- **index.html**: Main page with all content sections (Intro, Publications, About Me, Contact)
- **assets/**: Contains all supporting files
  - **css/**: Stylesheets (compiled from SASS)
  - **js/**: JavaScript files for interactions and responsive behavior
  - **sass/**: Source SASS files with modular organization
  - **images/**: Profile and achievement images
  - **webfonts/**: Font Awesome icons

## Key Technologies

- **HTML5 UP Prologue template**: Responsive single-page design
- **jQuery**: DOM manipulation and event handling
- **SASS**: CSS preprocessing with modular structure
- **Font Awesome**: Icon library
- **Responsive design**: Breakpoint-based layouts for different screen sizes

## Development Workflow

This is a static site with no build process or package management. To work with this codebase:

1. **Editing**: Directly edit HTML files for content changes
2. **Styling**: Modify SASS files in `assets/sass/` then compile to CSS
3. **Testing**: Open `index.html` in a web browser
4. **Deployment**: Copy files to any web server

## File Structure

```
├── index.html              # Main page with all content
├── assets/
│   ├── css/               # Compiled CSS
│   │   └── main.css
│   ├── js/                # JavaScript functionality
│   │   ├── main.js        # Core interactions
│   │   ├── util.js        # Utility functions
│   │   └── jquery*.js     # jQuery library
│   ├── sass/              # Source SASS files
│   │   ├── main.scss      # Main stylesheet
│   │   └── libs/          # SASS libraries and mixins
│   ├── images/            # Site images
│   └── webfonts/          # Font Awesome fonts
└── images/                # Additional images
```

## Content Management

- **Publications**: Listed in the #portfolio section of index.html
- **About Me**: Timeline of achievements in the #about section
- **Contact**: Email address in the #contact section
- **Profile**: Avatar and personal info in the #header section

## SASS Organization

The SASS files are modular with:
- `main.scss`: Entry point importing all other files
- `libs/_vars.scss`: Variables for colors, fonts, spacing
- `libs/_mixins.scss`: Reusable mixins
- `libs/_breakpoints.scss`: Responsive breakpoint definitions
- `libs/_functions.scss`: Utility functions

## JavaScript Features

- Smooth scrolling navigation
- Responsive breakpoint handling
- Preload state management
- Section activation based on scroll position

## License

The template is licensed under Creative Commons Attribution 3.0 Unported License.