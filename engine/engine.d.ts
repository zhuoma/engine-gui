declare namespace engine {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        isPointInRectangle(point: Point): boolean;
    }
    function pointAppendMatrix(point: Point, m: Matrix): Point;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m: Matrix): Matrix;
    function matrixAppendMatrix(m1: Matrix, m2: Matrix): Matrix;
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        toString(): string;
        updateFromDisplayObject(x: number, y: number, scaleX: number, scaleY: number, rotation: number): void;
    }
}
declare namespace engine {
    type Ticker_Listener_Type = (deltaTime: number) => void;
    class Ticker {
        private static instance;
        static getInstance(): Ticker;
        listeners: Ticker_Listener_Type[];
        register(listener: Ticker_Listener_Type): void;
        unregister(listener: Ticker_Listener_Type): void;
        notify(deltaTime: number): void;
    }
}
declare let imageJason: {
    id: string;
    width: number;
    height: number;
}[];
declare namespace engine {
    class ImageResource {
        bitmapData: HTMLImageElement;
        id: string;
        width: number;
        height: number;
        constructor(id: string, width: number, height: number);
    }
    class Resourse {
        resourses: ImageResource[];
        private static Res;
        constructor();
        static getInstance(): Resourse;
        getRes(id: string): ImageResource;
        initial(): void;
    }
}
declare namespace engine {
    class EventManager {
        targetArray: DisplayObject[];
        static eventManager: EventManager;
        constructor();
        static getInstance(): EventManager;
    }
    class MyEvent {
        eventType: string;
        ifCapture: boolean;
        target: DisplayObject;
        func: Function;
        constructor(eventType: string, func: Function, target: DisplayObject, ifCapture: boolean);
    }
    interface Drawable {
    }
    abstract class DisplayObject implements Drawable {
        x: number;
        y: number;
        scaleX: number;
        scaleY: number;
        rotation: number;
        alpha: number;
        globalAlpha: number;
        localMatrix: Matrix;
        globalMatrix: Matrix;
        parent: DisplayObjectContainer;
        touchEnabled: boolean;
        type: string;
        eventArray: MyEvent[];
        constructor(type: string);
        update(): void;
        addEventListener(eventType: string, func: Function, target: DisplayObject, ifCapture: boolean): void;
        abstract hitTest(x: number, y: number): DisplayObject;
    }
    class Bitmap extends DisplayObject {
        texture: ImageResource;
        constructor();
        hitTest(x: number, y: number): this;
    }
    class TextField extends DisplayObject {
        text: string;
        size: number;
        constructor();
        _measureTextWidth: number;
        hitTest(x: number, y: number): this;
    }
    class DisplayObjectContainer extends DisplayObject {
        children: DisplayObject[];
        constructor();
        update(): void;
        addChild(child: DisplayObject): void;
        removeChild(child: DisplayObject): void;
        hitTest(x: any, y: any): DisplayObject;
    }
}
declare namespace engine {
    let run: (canvas: HTMLCanvasElement) => DisplayObjectContainer;
}
