import React from 'react'
import Book from 'containers/Product/Book'
import landingBg from 'assets/imgs/landing.jpg'
import recommendBg from 'assets/imgs/rec.jpg'
import { benefits, genres, recommend, books, subGenres } from './data'
import './style.less'
import { Col, Row } from 'antd'

function Landing() {
  return (
    <div className='landingPage'>
      <div
        className='landing-header'
        style={{ backgroundImage: `url(${landingBg})` }}
      >
        <div className='container'>
          <h2>Welcome to Kafka,</h2>
          <p>New, cheap books with quality service.</p>
          <p>
            Kafka proud to be one of the best service in bringing knowledge
            closer to people's life.
          </p>
        </div>
      </div>

      <div className='benefitBar'>
        <div className='container'>
          <div className='row'>
            {benefits.map((v, i) => (
              <div key={i} className='col-md-4'>
                <i className={v.icon} />
                <div>
                  <h3>{v.name}</h3>
                  <p>{v.subname}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='trendingGenres'>
        <div className='container'>
          <Row className='title' align='middle'>
            <h2>Trending Genres</h2>
            <i className='fas fa-star' />
            <span>This Week</span>
          </Row>

          <Row className='genres' gutter={[12, 16]}>
            <Col span={15}>
              <div
                className='genre'
                style={{ backgroundImage: `url(${genres[0].bg})` }}
              >
                <div>{genres[0].genre}</div>
              </div>
            </Col>

            <Col span={9}>
              <Row gutter={[12, 16]}>
                <Col span={genres[1].col}>
                  <div
                    className='genre later'
                    style={{ backgroundImage: `url(${genres[1].bg})` }}
                  >
                    <div>{genres[1].genre}</div>
                  </div>
                </Col>
                <Col span={genres[2].col}>
                  <div
                    className='genre later'
                    style={{ backgroundImage: `url(${genres[2].bg})` }}
                  >
                    <div>{genres[2].genre}</div>
                  </div>
                </Col>
                <Col span={genres[3].col}>
                  <div
                    className='genre later'
                    style={{ backgroundImage: `url(${genres[3].bg})` }}
                  >
                    <div>{genres[3].genre}</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ marginTop: 30 }} gutter={[12, 8]} align='middle'>
            {subGenres.map((g) => (
              <Col flex={1} key={g}>
                <div className='subGenre'>{g}</div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div
        className='recommend-book'
        style={{ backgroundImage: `url(${recommendBg})` }}
      >
        <div>
          <div className='container'>
            <div className='row'>
              <div className='col-md-4'>
                <h4>Recommended Book</h4>
                <h1>{recommend.name}</h1>
                <h4>{recommend.author}</h4>
                <p>{recommend.desc}</p>
                <button>Get one now</button>
              </div>
              <div className='col-md-4'>
                <img src={recommend.front} alt='' />
              </div>
              <div className='col-md-4'>
                <img src={recommend.back} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='feature-books'>
        <div className='container'>
          <h2>Featured books</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{' '}
          </p>
          <div className='row'>
            {books.map((v, i) => (
              <div className='col-md-3' key={i}>
                <Book {...v} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='subcribe-email'>{/* content here */}</div>
      <div className='popular-authors'>{/* content here */}</div>
      <div className='upcoming-events'>{/* content here */}</div>
      <div className='daily-deals'>{/* content here */}</div>
      <div className='recent-blogs'>{/* content here */}</div>
    </div>
  )
}

export default Landing
