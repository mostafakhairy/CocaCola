import { UserRegister } from './userRegister';
import { Team } from './team';

export class UserPrediction {
    public id: number;
    public UserId: number;
    public Team1Result: number;
    public Team2Result: number;
    public WinnerTeamId: number;
    public BettingCoins: number;
    public MatchId: number;
    public PredictionDate: Date;
    public Name = 'prediction';
}
