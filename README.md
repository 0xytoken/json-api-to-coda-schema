# Simply & Effortlessly create a Coda Schema for your API within seconds ⏱

1. Call the API with a sample value

      ```f.e. https://api.opensea.io/api/v1/collection/boredapeyachtclub```

2. Copy the JSON response and call the parser function on it ```jsonToCodaSchema(YUOR_COPIED_JSON_RESPONSE)```

***Et Voila!***

Now, you have an extensive coda schema tailored to your API. 

<sup>NOTE: You might have to adjust the result to remove the ```***TODO***``` values, as they are placeholders for empty Arrays and Objects for which you have to manually define the expected type. Also, to use certain properties as ```featuredProperties```, you should duplicate these properties and add them as top-level in your schema, and then, in your coda parsing function, you will want to adjust the response to it, before assigning it to your schema.</sup>
