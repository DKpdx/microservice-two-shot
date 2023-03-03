# Wardrobify

Team:

* Person 1 - Which microservice?
* Danny Mitchell - Hat microservice?

## Design

## Shoes microservice
1, Install django app into django project settings:
add this line “shoes_rest.apps.ShoesApiConfig” into INSTALLED_APPS, don’t forget the ‘,’ after it.
2, make the models. 


## Hats microservice

List of the steps i took:
I made the models.py classes LocationVO and Hats with all the parameters. I then next went views.py made my three encoders and my two functions. After that I proceeded to make a urls.py, admin.py and hats_project urls.py to connect all of this together.
Then I went into our src file starting with making the HatForm.js and linked that into App.js and Nav.js and tested out that it worked. Once that was done I created my HatList.js and treated it like our previous Conference-GO main page. Where I implemented cards and columns using an array containing three arrays. Then linked it up through Nav.js and App.js to check it all worked and looked how I wanted it to. I also added "d-none" to the hats link in Nav so it would not show up but allow the button on list page to render the form page still.
