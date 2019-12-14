import React from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import UserInfo from '../Components/UserInfo';

class UserInfoContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        email: '',
        phoneNumber: ''
      }
    };
  }

  async componentDidMount() {
    await this._fetchUser();
  }

  _fetchUser = async () => {
    const userId = 1;
    const fetchUserUrl = `http://localhost:3000/users/${userId}`;
    try {
      const { data: user } = await axios.get(fetchUserUrl);
      this.setState({ user });
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { user } = this.state;
    return (
      <UserInfo user={user} />
    );
  }
}

export default UserInfoContainer;
