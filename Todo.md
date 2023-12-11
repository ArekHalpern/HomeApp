Frontend todos:

[]design guest home

[] redesign buttons
[] wrap getSingleImage in modal
[] redesign editImage feature so that you can edit the name and description by clicking the text and then clicking an 'update' button
[x] render image on frontend
[] alert when picture is saved
[] alert when picture is deleted -- revert state
[] button style should show as 'pressed down' when applied and can be unpressed to unapply
[] clear prompt bar

deconstruct front end for better performance and to avoid bugs:
[] create a new component for the prompt bar
[x] create a new component for download button

[x]adjust images model so that it belongs to user
[x]add feature allowing user to save generated images to their account
[x]fix navbar logged out state
[x]fix navbar flex display for phone accesibility
[]redesign navbar

--------------------------------------------------------------------------------

Database todos:
Prompts to add for easy user access;
[x] realistic photo
[x] anime
[x] logo
[] design backgrounds

Image API:
[x] add PUT
[x] add Patch
[x] add Delete

User model;
[] add email to user model
[] add email verification
[] add password reset
[] add password change
[] add user profile page
[] add user profile picture
[] add user settings
[] add OAuth

[] figure out how to save output images to database when user clicks "save" button. currently being accesed through URL.

--------------------------------------------------------------------------------

Research Notes:
 speed up api request -- //run an gpu instance to avoid cold boots and speed up but cost $$
 use a prompt table in your database similar to 'styles' in midjourney for realistic, anime, etc

figure out fine tuning
figure img2img
figure out how to use civicai models on replicate


Moat Notes:
partner with artists, celebrities, and designers to build unique models that we can legally distribute

Most people know about midjourney but dont know what to use it for. This app will provide basic use cases in a more user friendly way.