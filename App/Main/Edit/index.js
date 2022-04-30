import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import _ from 'lodash';
import Detail from './Detail';
import Form from './Form';
const Edit = props => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const {navigation, route} = props;
  return (
    <View>
      {isEdit ? (
        <Form navigation={navigation} route={route} setIsEdit={setIsEdit} />
      ) : (
        <Detail navigation={navigation} route={route} setIsEdit={setIsEdit} />
      )}
    </View>
  );
};

export default Edit;
