# Eleventy Starter Ghost

A starter template to build completely static websites with [Ghost](https://ghost.org) & [Eleventy](https://www.11ty.io)

**Demo:** https://eleventy.ghost.org

![screenshot](https://user-images.githubusercontent.com/1177460/61880744-5b138980-aeed-11e9-9d8e-07c0b3c03cc5.png)

# Installing

```bash
# From Source
git clone https://github.com/TryGhost/eleventy-starter-ghost.git
cd eleventy-starter-ghost
```

Then install dependencies

```bash
yarn
```

# Running

Start the development server

```bash
yarn start
```

You now have a completely static site pulling content from Ghost running as a headless CMS.

By default, the starter will populate content from a default Ghost install located at https://eleventy.ghost.io.

To use your own install, edit the `.env` config file with your credentials. You can find your `contentApiKey` in the "Integrations" screen in Ghost Admin. The minimum required version for Ghost is `2.10.0` in order to use this starter without issues.

# Deploying with Netlify

The starter contains three config files specifically for deploying with Netlify. A `netlify.toml` file for build settings, a `headers.njk` file with default security headers set for all routes (builds to `/_headers` path), and `redirects.njk` to set Netlify custom domain redirects (builds to `/_redirects` path).

To deploy to your Netlify account, hit the button below.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TryGhost/eleventy-starter-ghost)

Content API Keys are generally not considered to be sensitive information, they exist so that they can be changed in the event of abuse; so most people commit it directly to their `.env` config file. If you prefer to keep this information out of your repository you can remove this config and set [Netlify ENV variables](https://www.netlify.com/docs/continuous-deployment/#build-environment-variables) for production builds instead.

Once deployed, you can set up a [Ghost + Netlify Integration](https://docs.ghost.org/integrations/netlify/) to use deploy hooks from Ghost to trigger Netlify rebuilds. That way, any time data changes in Ghost, your site will rebuild on Netlify.

# Optimising

You can disable the default Ghost Handlebars Theme front-end by enabling the `Make this site private` flag within your Ghost settings. This enables password protection in front of the Ghost install and sets `<meta name="robots" content="noindex" />` so your Eleventy front-end becomes the source of truth for SEO.

# Extra options

```bash
# Build the site locally
yarn build
```

# Copyright & License

Copyright (c) 2013-2020 Ghost Foundation - Released under the [MIT license](LICENSE).
