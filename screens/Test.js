import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { CreateRouteLayout } from '../components/CreateRoute_Shared';

export default function FetchData() {
  const handlePostRequest = () => {
    console.log('pressed');
    const recipeData = {
      title: 'Recipe Title',
      description: 'Recipe Description',
      foodSize: 4,
      cookTime: 30,
      step: [
        {
          stepId: 1,
          stepDescription: 'Step 1 Description',
          img: 'base64-encoded-image-string',
        },
        {
          stepId: 2,
          stepDescription: 'Step 2 Description',
          img: 'base64-encoded-image-string',
        },
      ],
    };

    axios
      .post('https://test-server-psak.onrender.com/recipe/new', recipeData)
      .then(response => {
        console.log('Response:', response.config.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <CreateRouteLayout>
      <TouchableOpacity
        style={{ backgroundColor: 'chartreuse', width: '50%', height: '50%' }}
        onPress={() => handlePostRequest()}
      >
        <Text>Hello</Text>
      </TouchableOpacity>
    </CreateRouteLayout>
  );
}
