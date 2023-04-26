import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    console.log(`${term} was searched`);
    $.ajax({
      url: "/repos",
      method: "POST",
      data: { username: term },
      dataType: "text",
      success: () => {
        $.ajax({
          url: "/repos",
          method: "GET",
          success: (response) => {
            console.log('this is the response data', response)
            setRepos([response.data])},
          error: () => console.log('Whoops on the GET')
        })
      },
      error: () => console.log('Whoops on the POST')
    })
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));