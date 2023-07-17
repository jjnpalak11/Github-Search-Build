import React, { useEffect , Fragment} from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';

const User = ({ user, loading, getUser, getUserRepos, repos }) => {
  const { login } = useParams();

  useEffect(() => {
    getUser(login);
    // eslint-disable-next-line
  }, [getUser, login]); //useEffect will only run when login changes

  useEffect(() => {
    getUserRepos(login);
    // eslint-disable-next-line
  }, [getUserRepos, login]); //useEffect will only run when repos change

  if (loading || !user) {
    return <Spinner />;
  }

  const {
    name,
    avatar_url,
    location,
    hireable,
    bio,
    html_url,
    blog,
    company,
    followers,
    following,
    public_repos,
    public_gists
  } = user;

  return (
    <>
      <Link to="/" className="btn btn-light">Back to Search</Link>
      Hireable: {' '}
            {hireable ? (
              <i className="fas fa-check text-success" />
            ) : (
              <i className="fas fa-times-circle text-danger" />
            )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt=""
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
          <Fragment>
            <h3>Bio</h3>
            <p>{bio}</p>
          </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit GitHub Profile
            </a>
            <ul>
              <li>
                {login && <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>}
              </li>

              <li>
                {company && <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>}
              </li>

              <li>
                {blog && <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>}
              </li>
            </ul>
        </div>
      </div>

      <div className='card text-center'>
         <div className='badge badge-primary'> Followers: {followers} </div>
         <div className='badge badge-success'> Following: {following} </div>
         <div className='badge badge-light'> Public Repos: {public_repos} </div>
         <div className='badge badge-dark'> Public Gists: {public_gists} </div>
      </div>

      <Repos repos={repos} />
    </>
  );
}

User.propTypes={
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired
};

export default User;
