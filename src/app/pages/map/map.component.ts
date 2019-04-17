import {Component, OnInit} from '@angular/core';
import {NavigatorService} from '../../services/navigator.service';
import {Coords} from '../../models/Coords';
import {Post} from '../../models/Post';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private center: Coords;
  private newMarker: Coords | null;
  posts: Array<Post>;

  constructor(private navigatorService: NavigatorService) {
    this.center = this.navigatorService.getPosition();
  }

  ngOnInit() {
    this.center = this.navigatorService.getPosition();
    this.newMarker = null;
  }

  mapRightClick({coords}) {
    this.newMarker = coords;
  }

  mapClick() {
    this.newMarker = null;
  }

  markerClick(event) {

  }

  alert() {
    alert('Test');
  }
}
