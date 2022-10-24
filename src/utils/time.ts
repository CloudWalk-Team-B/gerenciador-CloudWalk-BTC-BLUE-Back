export default class Time {

  static async ms (tempo: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, tempo)
    })
  }

  static async sec (tempo: number) {
    return this.ms(tempo * 1000)
  }

  static agora () {
    const microTime = process.hrtime()
    return Math.floor(microTime[0] * 1000000 + microTime[1] / 1000)
  }

}
