# SearchBox using Typesense

This project includes usage of very popular and fast search engine i.e., [Typesense](https://typesense.org/). Typesense is the lightening-fast Open source Search engine that uses cutting-edge search algorithms that take advantage of the latest advances in Hardware Capabilities & Machine Learning. It provides a great wrapper & RESTful APIs to integrate with the typesense Cloud.

Typesense Cloud is the platform to upload the dataset that we want typesense to indexed and one the platform indexed the dataset then it become very easy and very fast to retrieve the data from typesense. Typesense under the hood do all kind of computation and just gives us the results according to our query along with the some other helpful attributes to configure like

1. Typo Tolerance
2. Federated Search
3. Easy High Availability
4. Tunable Ranking
5. Filtering & Faceting

  

## Dataset Used for the Project:

  

There are a lot of options available for the dataset. This dataset that I have used for this Project is of Movies. I have taken this dataset from [Kaggle] (https://www.kaggle.com/). It consist of **8000+** records of Netflix Movies. Dataset is fun to work with as it consist of many different attributes such as

- Title (searching will be on this attribute) 
- Cast
- Country
- Date Added
- Description
- Director
- Duration
- Release Year (Filter on this attribute)
- Type etc (Filter on this attribute)
- Rating etc

### Searching Crieteria:

 
I have make this very simple. the **title** attribute of the movie is used for searching when user sends the query. All of the movies matching the title attribute will be returned along with all other attirbutes. Other then that, Once user got the data from Typesense. The User then also have the ability to further filter the data by two attributes like **Release Year, Type**

  
  

## How to Run the Project:

  

For the demo purpose, this project has already been deployed on netlify. You can checkout the demo [here](https://venerable-parfait-cada93.netlify.app/). Here You can find the Input field to enter the name of the Movie and it will extract the data from the Typesense Cloud and after it is very easy to interact with the data. Enjoy!!.

  
  

### How to Setup and Run the Project locally.

  

Project is not complex to setup. It's is React based application. Simply clone the repository on local and install all of the node packages using command

`npm install`


After that there are three main things that you need.

 1. Typesense **API Key**
 2. Typesense **Host Node**
 3. **Dataset** deployed on Typesense Cloud

  
I have deployed the code on Typesense Cloud and from their you can easily get the API keys and Host Node. Perform these actions Step-by-step to configure the project on local.

1. Get the Dataset from Kaggle. You can **download the dataset** from here [Netflix-Movies](https://www.kaggle.com/datasets/shivamb/netflix-shows). After downloading it, Upload the dataset on Typesense Cloud. Don't worry. They provide **30 days** free trail on basic package. You will not be charged. Make an account on Typesense Cloud and upload the Dataset over there so that Typesnese can index the data.

2. Get the **API keys** and **Host Node** from Typesense Cloud. In the Overview section, you easily download the credentials to use.

3. Inside the Project. Set the **environment variables** by their specified position and name.
4. After doing all of the things properly then simply run the node server using `npm start`

If you have done everything properly, then it will be running as exact as in the demo. However, in case of any issues, queries and suggestions, You can contact me. Thanks.!!