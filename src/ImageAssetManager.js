class ImageAssetManager {
  static _PickRandomItemFromArray (array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  static PickRandomAsset () {
    return this._PickRandomItemFromArray(Object.entries(this.imageAssets))
  }
}

/*
  https://twitter.com/mangatimekirara/status/975387610481750016
  https://twitter.com/mangatimekirara/status/1008728919472631810
  https://twitter.com/mangatimekirara/status/1064173036029456384
 */
ImageAssetManager.imageAssets = {
  '001': '憂鬱な月曜日が始まった',
  '002': 'できれば行きたくない 風邪をひいて休もう…',
  '003': '…えっあっ いつも話しかけて貰う前提だったから話の振り方がわからない…',
  '004': 'もう調子に乗るのはやめよう 慎ましく生きよう…',
  '005': '絶対いやだ！ 働きたくない‼ 怖い！ 社会が怖い‼',
  '006': 'いいいいイキってすみません…',
  '007': '現実が辛くても大丈夫！ネットには私に反応してくれる人がたくさんいるもん… ネットの世界の人達は私と同じで暗い人ばっかだし！',
  '008': 'きょっ今日は人と話しすぎて疲れたので帰ります…',
  '009': '終わった…',
  '010': '冗談でもそんなこと言っちゃだめだよ 人の痛みがわかる子になりなさい…',
  '011': '時進むの早すぎッ‼',
  '012': 'ロックですねぇ… めちゃくちゃロックしてるねぇ…'
}

module.exports = ImageAssetManager
