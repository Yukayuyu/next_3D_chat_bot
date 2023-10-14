import { OrthographicCamera, PerspectiveCamera, Vector3 } from 'three';

/**
 * params:
 * position, x, y, z, fov, near, far, aspect
 *
 */
export function DefaultPerspectiveCamera({ position, x, y, z, fov, near, far, aspect }: {
  position?: Vector3,
  x?: number,
  y?: number,
  z?: number,
  fov?: number,
  near?: number,
  far?: number,
  aspect?: number
}): PerspectiveCamera
{
  const cemera = new PerspectiveCamera();
  position ? cemera.position.set(position.x, position.y, position.z) : cemera.position.set(0, 0, 20);
  x ? cemera.position.setX(x) : null;
  y ? cemera.position.setY(y) : null;
  z ? cemera.position.setZ(z) : null;
  fov ? cemera.fov = fov : cemera.fov = 500;
  near ? cemera.near = near : null;
  far ? cemera.far = far : cemera.far = 1000;
  aspect ? cemera.aspect = aspect : null;

  return cemera;
}


/**
 * params:
 * position, x, y, z, left, right, top, bottom, near, far
 *
 */
export function DefaultOrthographicCamera(...args: any[]): OrthographicCamera
{
  const cemera = new OrthographicCamera();
  args && args["position"]<Vector3> ? cemera.position.set(args["position"].x, args["position"].y, args["position"].z) : cemera.position.set(0, 10, 50);
  args && args["x"] ? cemera.position.setX(args["x"]) : null;
  args && args["y"] ? cemera.position.setY(args["y"]) : null;
  args && args["z"] ? cemera.position.setZ(args["z"]) : null;
  args && args["left"] ? cemera.left = args["left"] : null;
  args && args["right"] ? cemera.right = args["right"] : null;
  args && args["top"] ? cemera.top = args["top"] : null;
  args && args["bottom"] ? cemera.bottom = args["bottom"] : null;
  args && args["near"] ? cemera.near = args["near"] : null;
  args && args["far"] ? cemera.far = args["far"] : cemera.far = 1000;

  return cemera;
}
