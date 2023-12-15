"use strict";

/**
 * `page-populate-middleware` middleware
 */

const populate = {
  contentSections: {
    populate: {
      picture: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      buttons: {
        populate: true,
      },
      feature: {
        populate: {
          fields: ["title", "description", "showLink", "newTab", "url", "text"],
          media: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      testimonials: {
        populate: {
          picture: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      plans: {
        populate: ["product_features"],
      },
      slides: {
        populate: {
          fields: ["title", "description", "buttons"],
          picture: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
          buttons: {
            fields: ["url", "newTab", "text", "type"],
          },
        },
      },
      click_to_actions: {
        populate: {
          fields: ["title", "icon", "background"],
          background: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
          lead_bg: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      link: {
        populate: {
          fields: ["url", "newTab", "text", "type"],
        },
      },
      background: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      services: {
        populate: {
          fields: ["title", "description", "icon", "image", "link"],
          image: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      submitButton: {
        populate: true,
      },
    },
  },
  seo: {
    fields: ["metaTitle", "metaDescription"],
    populate: { shareImage: true },
  }
};

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      populate,
      filters: { slug: ctx.query.filters.slug },
      locale: ctx.query.locale,
    };
    await next();
  };
};
