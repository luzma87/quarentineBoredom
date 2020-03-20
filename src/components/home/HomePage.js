import React from 'react';
import { compose } from 'recompose';
import CustomIcon from '../_common/CustomIcon';
import withAuthorization from '../session/withAuthorization';
import conditions from '../../constants/conditions';

const HomePage = () => (<div>
    Home!
    <CustomIcon icon="pen-fancy" />
    <CustomIcon icon={["fad", "pen-fancy"]} style={{ color: 'red' }} />
</div>);

export default compose(
    withAuthorization(conditions.isLoggedUser),
)(HomePage);
