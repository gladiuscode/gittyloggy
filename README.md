# GittyLoggy

This library can be used in your projects to properly generate a changelog
that all your PMs and Testers all around the world love so much.

## Installation

```bash
yarn -D gittyloggy
```

Or using npm

```bash
npm --save-dev gittyloggy
```

## How to use

Add a new script to your project package.json

```
"changelogs": "cl"
```

Then add a new .env file in the root of your project with the following keys

```dotenv
PEOPLE_TAGS=<nicknames>
PIPELINE_URL=<url_to_your_pipeline_running>
VERSION=<version>
TAG=<git_tag_to_reference_from>
```

This command will output a proper changelog that you can copy and paste wherever you need to.

## Roadmap

- [] Release this as a devDependency on npm
- [] Add support for multiple languages
