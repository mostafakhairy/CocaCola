import { Team } from './team';

export class Match {
  public Id: number;
  public Team1: Team;
  public Team2: Team;
  public Team1Result: number;
  public Team2Result: number;
  public MatchDate: Date;
  public BettingCoins: number;
}
