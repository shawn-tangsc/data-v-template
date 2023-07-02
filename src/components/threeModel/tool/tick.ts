export default function Tick(fuc: any, name?: string) {

  const Renderer = { animate: true, name: '' }
  // 1.Object.create创建一个对象，并且将该对象的原型设置为Renderer对象，然后再通过Object.assign将fuc, name 分配给刚刚创建的对象
  const els = [Object.assign(Object.create(Renderer), { fuc, name })]
  const animate = () => {
    requestAnimationFrame(animate);
    els.forEach((o) => {
      const { fuc, animate } = o;
      if (animate) {
        fuc.call(o, Date.now())
      }
    })
  }
  animate()
  return els[0]
}