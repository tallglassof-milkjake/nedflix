import React from 'react';
import { setSearchList, fetchEpisode } from '../../store/slices/omdbSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';

interface Props {
    poster: string;
    season: string;
    title: string;
}

const EpisodeCard: React.FC<Props> = ({ poster, season }) => {
    const dispatch = useDispatch<AppDispatch>();
    const searchResultsSeasons = useSelector((state: RootState) => state.omdb.selectedResultSeasons);


    const handleSeasonSelect = () => {
        const episodes = searchResultsSeasons[parseInt(season) - 1].Episodes?.map((episode: Record<string, string>, index: number) => {
            if (!episode.poster || !episode.Poster) {
                
                return {
                    ...episode,
                    Poster: poster,
                    Season: season,
                }
            }

            dispatch(fetchEpisode({ episode: episode.Episode, season: episode.Season }));

            return episode;
        });
        dispatch(setSearchList(episodes));
    }

    return (
        <div className="max-w-[120px] min-w-[120px] flex flex-col gap-2 group">
            <img src={poster} alt="" className="group-hover:shadow-md transition-all cursor-pointer" onClick={handleSeasonSelect} />
            <p className="text-slate-900 font-semibold text-sm text-center">Season {season}</p>
        </div>
    )
}

export default EpisodeCard;