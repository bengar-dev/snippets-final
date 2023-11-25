'use strict';

/**
 * github-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::github-user.github-user');
