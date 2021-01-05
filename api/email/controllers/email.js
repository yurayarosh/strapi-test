'use strict';

/**
 * A set of functions called "actions" for `email`
 */

module.exports = {
  send: async (ctx, next) => {
    try {
      console.log('start email sending...');
      
      await strapi.plugins['email'].services.email.send({
        to: ctx.request.body.to,
        from: 'your@address.com',
        replyTo: 'your@address.com',
        subject: 'My message',
        text: 'Text',
        html: '<h1>Text</h1>'
      }, config);

      console.log('email was sent');
    } catch (err) {
      ctx.body = err;
    }
  }
};
