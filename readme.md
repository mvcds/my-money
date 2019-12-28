# Steps

1. Create package with directories
1. Create domain layer
1. Install things on domain layer `yarn workspace my-domain add faker mocha --dev`
1. The domain layer required factories when references were used within the project
1. Create UC layer
1. Install things on domain layer `yarn workspace my-use-cases add sinon cucumber --dev`
1. Cucumber required a forced "watcher"
1. My editor was having a problem when eslint was not added

# OBS

* All packages were created by yarn by runnint `yarn init -y` in the target folders
* When changing things on dependencies, the layer above does not workd
