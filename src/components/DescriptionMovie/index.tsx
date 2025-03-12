import { MovieProps } from '../AboutMovie'
import './index.scss'
import { languageArr } from '../../assets/language'
import { formatNumber } from '../../api/formatNumber';
import { FC } from 'react';

export const DscrMovie: FC<MovieProps> = ({ movie }) => {
    let languageString;
    languageArr.map(item => item.code === movie.language ? languageString = item.name : null)

    return (
        <section className="dscr-movie">
            <div className="container">
                <div className="dscr-movie__box">
                    <h2 className="dscr-movie__title">О фильме</h2>
                    <ul className="dscr-movie__list">
                        <li className="dscr-movie__list__item tr">
                            <div className='td td-left'>
                                <div className="td-box">
                                    <span className='td-box__dscr'>Язык оригинала</span>
                                    <span className='dots'></span>
                                </div>
                            </div>
                            <div className="td">{movie.language.length > 0 ? languageString : '-'}</div>
                        </li>
                        <li className="dscr-movie__list__item tr">
                            <div className='td td-left'>
                                <div className="td-box">
                                    <span className='td-box__dscr'>Бюджет</span>
                                    <span className='dots'></span>
                                </div>
                            </div>
                            <div className="td">{movie.budget !== null ? formatNumber(movie.budget) + ' $' : '-'}</div>
                        </li>
                        <li className="dscr-movie__list__item tr">
                            <div className='td td-left'>
                                <div className="td-box">
                                    <span className='td-box__dscr'>Выручка</span>
                                    <span className='dots'></span>
                                </div>
                            </div>
                            <div className="td">{movie.revenue !== null ? formatNumber(movie.revenue) + ' $' : '-'}</div>
                        </li>
                        <li className="dscr-movie__list__item tr">
                            <div className='td td-left'>
                                <div className="td-box">
                                    <span className='td-box__dscr'>Режиссёр</span>
                                    <span className='dots'></span>
                                </div>
                            </div>
                            <div className="td">{movie.director !== null ? movie.director : '-'}</div>
                        </li>
                        <li className="dscr-movie__list__item tr">
                            <div className='td td-left'>
                                <div className="td-box">
                                    <span className='td-box__dscr'>Продакшен</span>
                                    <span className='dots'></span>
                                </div>
                            </div>
                            <div className="td">{movie.production !== null ? movie.production : '-'}</div>
                        </li>
                        <li className="dscr-movie__list__item tr">
                            <div className='td td-left'>
                                <div className="td-box">
                                    <span className='td-box__dscr'>Награды</span>
                                    <span className='dots'></span>
                                </div>
                            </div>
                            <div className="td">{movie.awardsSummary !== null ? movie.awardsSummary : '-'}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

    )
}