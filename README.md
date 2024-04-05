# GittyLoggy

This library can be used in your projects to properly generate a changelog
that all your PMs and Testers all around the world love so much.

To properly function it needs a tag commit that represent the last release and
a logs.txt file under a /data folder in the root of the project.

## How to use

In your project root run the following command to produce the logs file:

```bash
git log --pretty=format:"%d %s" >> logs.txt
```

Then you can move this file in the /data folder inside this project and run
the following commands:

```bash
yarn build
yarn start
```

## Roadmap

- [] Release this as a devDependency on npm
- [] Add support for multiple languages
