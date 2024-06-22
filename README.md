# Generating Training Data with OpenAI Function Calling

As I delve into the fields of Machine Learning and AI, it's clear that the quality of training data is crucial. Creating training data, such as labeling 10,000 texts or images, can be a tedious task. However,
OpenAI models can be used to automate this process. This is an example how can we use OpenAI to generate training data.

### Why Use Function Calling for This?
One of the most useful features of OpenAI is function calling. It can call our functions with a predefined schema, ensuring consistency. When generating training data, this consistency is crucial. For example, most label values must follow a schema with a predefined set of options. Additionally, you can add logic to these functions to handle the clean, consistent data, such as saving it to a database or a CSV file.