# Spotlight on Suburbia
## 11060 Interactive Project
## Production Journal
##### Stefanie Mamone u3027318

### INDIVIDUAL WEB APPLICATION
Link: https://smamone.github.io/individual-web-app

#### RESEARCH
I began this project by researching the data available within the GLAM APIs. Trove had a vast range of data from various sources. In my Trove search, I came across the Origins and meanings of Canberra's suburbs and street names, however the API proved to be a broken link. Determined to proceed with this intriguing idea, it led me on a search to find similar data available through APIs that would help me see through this idea.

On my search, I discovered there were many databases that provided the information I was looking for. The volume and format of the data returned from the APIs presented many challenges; determining the correct data fields for search queries, navigating to the required nested data, making several calls to the same APIs to access required data, and accessing data embedded in html. These issues had follow-on affects, such as determining a default location in the event of errors, and determining how to best access datasets for 100+ suburbs of Canberra which could be problematic as they may not all present consistently. Each API also only provided a small amount of data required. In addition, there was difficulty in tailoring API requests to return reliable and accurate data across multiple categories and suburbs; this, at times, resulted in multiple requests to APIs with limited daily requests.

During my API research, I also came across several websites that had similar purposes of displaying suburb data. I took inspiration from these websites to consider the data to include, the layout to present it, and the methods of interacting with it.

![Research](/images/journal/research.png)


#### SKETCHES

![Sketches](/images/journal/sketches.png)


#### WIREFRAMES

![Wireframes](/images/journal/wireframes.png)

I made several adjustments to layout and content from the sketches and wireframes to the final product to ensure an interactive project that would present the data in the most effective way. I added a "home" page, allowing the user to decide if they want to view data by their current location or search for another suburb in Canberra. This added further interaction and then takes the user to the data results "page". I also adjusted the layouts for each screen size to fit the content in the most effective way for user consumption; I added sliders to show and hide content as the user desires to avoid being overwhelmed by information, widened sections to make content fit the page more comfortably, and added icons to further demonstrate the meaning of data whilst providing more interest.

#### REFLECTION
I have created a novel web application using data from several GLAM APIs, including:

__ACTmapi API__
* Namesake (name, title, life, biography)

__Domain API__
* District
* Region
* Population
* Details
* Demographic
* Most common
* Surrounding suburbs

__Wikipedia API__
* Location image
* Namesake image
* Location summary

I supplemented the GLAM data with data from the following APIs:

__Dark Sky API__
* Coordinates
* Weather

__Open Cage API__
* Location name (reverse geocaching)
* Coordinates (forward geocaching)
* State
* Postcode

I created a goal-based interface for the purpose of displaying data of Canberran suburbs based on user location or user search. The interface is hierarchal, structural and visual. The data is grouped into categories by properties, providing the user with an easy-to-follow layout.

The project is interactive; an index page allows the user to choose to search data by their current location or by entering search terms, and the results page gives the user some options in showing or hiding secondary data.

The difficulty of accessing multiple APIs allowed me to understand the structure of the code behind making API calls and inserting the data into my own website; the challenges instilled a sense of accomplishment when things went as planned, and required problem-solving when they didn’t.

I would have liked to be able to add the following features to my website to further develop the data provided:
* Auotfill state/territory and postcode to avoid errors
* Street names
* Electoral data (territory electorate and federal division)
* Map of location

And although the data is included within the summary, I would have preferred to be able to display the year of establishment and street naming theme for each suburb separately inside the data categories. Further down the track, I would be interested in including data from all states/territories within Australia.

Overall, I developed a comprehensive concept of diverse data, combining historical information with data reflecting the current profile of the suburb.


#### References
tmsims15. (2020). *Phoenix, Hiking, Arizona, Desert*. Retrieved from: https://pixabay.com/photos/phoenix-hiking-arizona-desert-5135689/.


### GROUP WEBSITE
##### AmalGLAMation
Link: https://smamone.github.io/11060-interactive-project

My allocated role in the group was the set up and provision of access to group members of the GitHub repository, as well as the url set up for the group website. I requested this role as I had only used GitHub once before in the unit’s previous assessment, therefore I felt there was more for me to learn by taking on this role.

I continued my contribution to the group project by following up on the progress of tasks in Trello and via the Canvas discussion page, making suggestions to improve the output of the group website, and actioning various changes as necessary. I also contributed to the group project by making suggestions for a group website name, one of which was the final selection. The name, AmalGLAMation, is a play on amalgamation, meaning to combine/unite, i.e. an amalgamation of 11060 students' individual projects using GLAM data.
