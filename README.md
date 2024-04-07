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

```json5
{
  "scripts": {
    "gitty": "cl"
  }
}
```

Then add a new .gitty.config.json file in the root of your project with the following properties

```json5
{
  "PEOPLE_TAGS": "your pm and testers tags",
  "PIPELINE_URL": "your pipeline url",
  "VERSION": "your version",
  "TAG": "your tag to look up to"
}
```

This command will output a proper changelog that you can copy and paste wherever you need to.

## Roadmap

- [] Release on npm
- [] Add support for multiple languages
- [] Add support to run plugins so that each changelog output can be further customize to meet devs needs
