import { CheckCircle, Clock, Eye, Film } from "lucide-react";

export function Stats(){
    return(
                <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon gold">
              <Film size={22} />
            </div>
            <div className="stat-value">8</div>
            <div className="stat-label">Total Movies</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">
              <Eye size={22} />
            </div>
            <div className="stat-value">2</div>
            <div className="stat-label">Currently Watching</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <CheckCircle size={22} />
            </div>
            <div className="stat-value">3</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">
              <Clock size={22} />
            </div>
            <div className="stat-value">3</div>
            <div className="stat-label">Plan to Watch</div>
          </div>
        </div>
    )
}