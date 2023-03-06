# Wardrobify

Team:

* Janar Bukaihan - Shoe microservice
* Danny Mitchell - Hat microservice

## Design

## Shoes microservice
List of the steps i took:
1, Installed django app into django project settings:
added this line “shoes_rest.apps.ShoesApiConfig” into INSTALLED_APPS,
2, Made the models. In models I created classes BinVO and Shoe.
3, Made view functions and encoders.
4, Added path to url.py, admin.py, and shoes_project/urls.py.
5, Opened Insomnia put the urls in, tested if the funtions work.
6, Made polling function to let bin data communicated with shoes. Tested by creating a new shoe to shoelist on insomnia.
7, Started building frontend, added ShoeList component, implemented cards and column, each row has 3 columns.
8, Added CreateShoeForm component, wrote jsx as return, captured input data then turn them into states of the component.
9, Added nested route in App component.



## Hats microservice

List of the steps i took:
I made the models.py classes LocationVO and Hats with all the parameters. I then next went views.py made my three encoders and my two functions. After that I proceeded to make a urls.py, admin.py and hats_project urls.py to connect all of this together.
Then I went into our src file starting with making the HatForm.js and linked that into App.js and Nav.js and tested out that it worked. Once that was done I created my HatList.js and treated it like our previous Conference-GO main page. Where I implemented cards and columns using an array containing three arrays. Then linked it up through Nav.js and App.js to check it all worked and looked how I wanted it to. I also added "d-none" to the hats link in Nav so it would not show up but allow the button on list page to render the form page still.
