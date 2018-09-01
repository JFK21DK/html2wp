# HTML to WordPress Posts Converter

This is a simple Node.js script that uses the WordPress REST API ([wpapi](https://www.npmjs.com/package/wpapi)) in order to import HTML based articles as Posts in WordPress.


## How to Use

Before using this script, HTTP Basic Authentication must be enabled. Install and activate the following plugin in your WordPress site:

- [Basic-Auth](https://github.com/WP-API/Basic-Auth)

### Setup

Install the dependencies using `yarn`:

```bash
$ yarn
```

### Configure

Change the values in the `config.js` file according to your setup.

### Execute

Run the script:

```bash
$ node ./index.js
```


## Requirements

This script has been tested on Node.js version 8.9.4 and yarn version 1.3.2 has been used for dependency management.
