import React, { useEffect } from 'react';
import { CreateRouteLayout } from '../components/CreateRoute_Shared';

const CreateRoute_5 = ({ route }) => {
  let url = 'http://3.37.189.80/trip/search/address';

  const postRouteData = () => {
    axios
      .post(url, recipeData)
      .then(response => {
        console.log('Response:', response.config.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    let title = route.params.title;
    let region = route.params.region;
    let locations = route.params.locations;
    let hashtag = route.params.hashtag;
    let locationInfo = [];
    // console.log(title, region, hashtag, locations);
    console.log(locations.length);

    for (let i = 0; i < locations.length; i++) {
      locationInfo.push({
        name: locations[i].name,
        longitude: locations[i].coord.longitude,
        latitude: locations[i].coord.latitude,
        description: locations[i].description,
        locationImg: '',
      });
    }
    console.log(locationInfo);
    // const routeData = {
    //   address: region.name,
    //   title,
    // };
    // const routeData = {
    //   address:,
    //   description: 'Recipe Description',
    //   foodSize: 4,
    //   cookTime: 30,
    //   step: [
    //     {
    //       stepId: 1,
    //       stepDescription: 'Step 1 Description',
    //       img: 'base64-encoded-image-string',
    //     },
    //     {
    //       stepId: 2,
    //       stepDescription: 'Step 2 Description',
    //       img: 'base64-encoded-image-string',
    //     },
    //   ],
    // };

    // postRouteData(routeData);
  }, []);

  return <CreateRouteLayout></CreateRouteLayout>;
};
export default CreateRoute_5;

// data.append('address', '서울특별시 영등포구');
// data.append('title', '안녕하세요?');
// data.append('tag[0].name', '심규');
// data.append('locationInfo[0].address', '롯데리아');
// data.append('locationInfo[0].description', '맛있어');
// data.append('locationInfo[0].sequence', '1');
// data.append('locationInfo[0].locationImage', fs.createReadStream('/Users/simgyumin/
