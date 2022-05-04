import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {AngularSvgIconModule} from "angular-svg-icon";

@NgModule({
  imports: [HttpClientModule, QuillModule.forRoot(), AngularSvgIconModule.forRoot()],
  exports: [HttpClientModule, QuillModule, AngularSvgIconModule],
})
export class SharedModule {}
