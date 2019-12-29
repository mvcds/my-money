# Experiment: clean architecture + forcing layering with yarn workspace

This repo was created for me to test the "forcing layering with yarn workspace" part of my experiments with "clean architecture".

Something I was writing about on [Code Thoughts][2]

## Steps

1. Create package with directories
1. Create domain layer
1. Install things on domain layer `yarn workspace my-domain add faker mocha --dev`
1. The domain layer required factories when references were used within the project
1. Create UC layer
1. Cucumber required a forced "watcher"
1. My editor was having a problem when eslint was not added
1. Clean architecture was improved after feedback
1. Create adapters layer

## OBS

* All packages were created by yarn by runnint `yarn init -y` in the target folders, the `package.json` was then changed to use a better package name and use version as `0.0.0`
* When changing things on dependencies, the layer above does not works
* After creating a new layer, I removed all `node_modules` folders (root and workspaces) and rerun `yarn` on the root project - but just because I'm paranoid, you don't need to do it as [things will work ~almost~ all the time][1]

## Known issues

### Installing the same dependency on same workspace

By mistake, I have installed the same dependency on the same workspace when I was creating a new layer, this caused `yarn.lock` to lose itself, and it contained duplicated references to the added package.

Installing, itself, didn't present any errors, but when I tried to run tests, they were failing, and all I had was a brand new `yarn-error.log`.

Removing all `node_modules` (root and workspaces) and `yarn.lock`, and running `yarn` at root level fixed the problem.

[1][#installing-the-same-dependency-on-same-workspace]
[2][https://medium.com/code-thoughts/stories/published]
