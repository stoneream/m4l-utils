class LiveObjectObserver {
  constructor(path, property, handler) {
    this.logger = new Logger("LiveObjectObserver");

    this.initialized = false;
    this.detectedPropertySet = false;
    this.detectedFirst = false;

    this.api = new LiveAPI(() => this._callback(), path);

    this.property = property;
    this.handler = handler;
  }

  _callback() {
    // ハンドラーがセットされていない場合は処理をスキップ
    if (!this.handler) {
      return;
    }

    // インスタンス生成直後のコールバックをスキップ
    if (!this.initialized) {
      this.logger.info("LiveAPI initialized");
      this.initialized = true;

      this.api.property = this.property;
      this.logger.info("Set property", { property: this.property });
      return;
    }

    // プロパティセット直後のコールバックをスキップ
    if (!this.detectedPropertySet) {
      this.logger.info("Detected property set");
      this.detectedPropertySet = true;
      return;
    }

    // 最初の変更通知をスキップ
    if (!this.detectedFirst) {
      this.logger.info("Detected first change notification");
      this.detectedFirst = true;
      return;
    }

    this.handler();
  }
}
