import { Component, Input, OnInit, signal } from '@angular/core';
import { MenuService } from '../app.menu.service';
import {
    ColorScheme,
    LayoutService,
    MenuMode,
} from '../service/app.layout.service';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
})
export class AppConfigComponent implements OnInit {

    @Input() minimal: boolean = false;

    selectedScene = signal<string>('');

    constructor(
        public layoutService: LayoutService,
        public menuService: MenuService
    ) {}

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }
    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    set menuMode(_val: MenuMode) {
        this.layoutService.config().menuMode = _val;
        if (
            this.layoutService.isSlimPlus() ||
            this.layoutService.isSlim() ||
            this.layoutService.isHorizontal()
        ) {
            this.menuService.reset();
        }
    }

    set colorScheme(_val: ColorScheme) {
        if (_val !== this.layoutService.config().colorScheme) {
            this.layoutService.config.update((config) => ({
                ...config,
                menuTheme: _val === 'dark' ? 'dark' : 'light',
                colorScheme: _val,
            }));

            setTimeout(() => {
                if (_val === 'dark') {
                    this.componentTheme =
                        this.componentTheme === 'black'
                            ? 'purple'
                            : this.componentTheme;
                }
            }, 10);
        }
    }


    set menuTheme(_val: ColorScheme) {
        this.layoutService.config.update((config) => ({
            ...config,
            menuTheme: _val,
        }));
    }

    set topbarTheme(_val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            topbarTheme: _val,
        }));
    }

    get componentTheme(): string {
        return this.layoutService.config().componentTheme;
    }
    set componentTheme(_val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            componentTheme: _val,
        }));
    }

    ngOnInit() {

    }


    changeScene(item: any) {
        const {
            colorScheme,
            componentTheme,
            menuTheme,
            topbarTheme,
            menuMode,
            sceneName,
        } = item;
        this.selectedScene.set(sceneName);
        this.colorScheme = colorScheme;
        this.componentTheme = componentTheme;
        this.menuTheme = menuTheme;
        this.topbarTheme = topbarTheme;
        this.menuMode = menuMode;
    }
}
