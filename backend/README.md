# Mogaash Backend

This is the backend part of the project **Mogaash**. This part handles connection  and the data flow between **MongoDB** and the **REACT** frontend.


## Implementations

Used **Python Flask** as the framework to support frontend to get data from database. 
*(Currently, database is hosted using local **MongoDB Compass**. Further transformation to server database will be implemented in the future.)*

## Startup
```python
pip install Flask
```
```python
pip install pymongo
```
```python
set FLASK_APP=app.py
```
```python
flask run
```

## Supported Requests

1. http://127.0.0.1:5000/
		Home page for the backend host
		**/TODO:** Guide and API usage
2. http://127.0.0.1:5000/word?name=\<word you want to search>
		Get specific word definition from database
		Returns ***JSON*** object: 
	```python
		[{"text":"blablabla","type":"noun"},{"text":"blablabla","type":"verb"}]
	```
	OR
	```python
		"Did not find word with "<word you want to search>""
	```
	**/TODO:** Automatically add unseen word using ***Merriam Webster Dictionary API***