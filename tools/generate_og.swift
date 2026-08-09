#!/usr/bin/env swift

import AppKit
import Foundation

let canvasSize = NSSize(width: 1200, height: 630)
let scriptURL = URL(fileURLWithPath: #filePath)
let projectRoot = scriptURL.deletingLastPathComponent().deletingLastPathComponent()
let sourceURL = projectRoot.appendingPathComponent("assets/og/source/NIND_corkboard_ISO200-1920px.png")
let outputURL = projectRoot.appendingPathComponent("assets/og/black-org-evidence-board-og.png")

guard let sourceImage = NSImage(contentsOf: sourceURL) else {
  fatalError("Unable to load source image at \(sourceURL.path)")
}

func color(_ hex: UInt32, alpha: CGFloat = 1) -> NSColor {
  NSColor(
    calibratedRed: CGFloat((hex >> 16) & 0xff) / 255,
    green: CGFloat((hex >> 8) & 0xff) / 255,
    blue: CGFloat(hex & 0xff) / 255,
    alpha: alpha
  )
}

func font(_ names: [String], size: CGFloat, fallbackWeight: NSFont.Weight = .regular) -> NSFont {
  for name in names {
    if let candidate = NSFont(name: name, size: size) {
      return candidate
    }
  }
  return NSFont.systemFont(ofSize: size, weight: fallbackWeight)
}

func drawText(
  _ text: String,
  at point: NSPoint,
  font: NSFont,
  color: NSColor,
  tracking: CGFloat = 0
) {
  let attributes: [NSAttributedString.Key: Any] = [
    .font: font,
    .foregroundColor: color,
    .kern: tracking,
  ]
  NSAttributedString(string: text, attributes: attributes).draw(at: point)
}

func drawLine(from start: NSPoint, to end: NSPoint, color: NSColor, width: CGFloat) {
  let path = NSBezierPath()
  path.move(to: start)
  path.line(to: end)
  path.lineWidth = width
  color.setStroke()
  path.stroke()
}

let canvas = NSImage(size: canvasSize)
canvas.lockFocusFlipped(true)

guard let context = NSGraphicsContext.current else {
  fatalError("Unable to create drawing context")
}
context.imageInterpolation = .high

let canvasRect = NSRect(origin: .zero, size: canvasSize)
let sourceAspect = sourceImage.size.width / sourceImage.size.height
let canvasAspect = canvasSize.width / canvasSize.height
let cropSize: NSSize
if sourceAspect > canvasAspect {
  cropSize = NSSize(width: sourceImage.size.height * canvasAspect, height: sourceImage.size.height)
} else {
  cropSize = NSSize(width: sourceImage.size.width, height: sourceImage.size.width / canvasAspect)
}
let sourceRect = NSRect(
  x: (sourceImage.size.width - cropSize.width) / 2,
  y: (sourceImage.size.height - cropSize.height) / 2,
  width: cropSize.width,
  height: cropSize.height
)
sourceImage.draw(
  in: canvasRect,
  from: sourceRect,
  operation: .sourceOver,
  fraction: 1,
  respectFlipped: true,
  hints: [.interpolation: NSImageInterpolation.high]
)

let monochrome = color(0x17130f, alpha: 0.42)
monochrome.setFill()
canvasRect.fill()

let shade = NSGradient(colorsAndLocations:
  (color(0x090a0c, alpha: 0.79), 0),
  (color(0x090a0c, alpha: 0.59), 0.54),
  (color(0x090a0c, alpha: 0.31), 1)
)!
shade.draw(in: canvasRect, angle: 0)

for x in stride(from: CGFloat(0), through: canvasSize.width, by: 44) {
  drawLine(from: NSPoint(x: x, y: 0), to: NSPoint(x: x, y: canvasSize.height), color: color(0xe7dec8, alpha: 0.035), width: 1)
}
for y in stride(from: CGFloat(0), through: canvasSize.height, by: 44) {
  drawLine(from: NSPoint(x: 0, y: y), to: NSPoint(x: canvasSize.width, y: y), color: color(0xe7dec8, alpha: 0.035), width: 1)
}

let signalRed = color(0xc4473c, alpha: 0.94)
let thread = NSBezierPath()
thread.move(to: NSPoint(x: 836, y: 116))
thread.curve(to: NSPoint(x: 1083, y: 273), controlPoint1: NSPoint(x: 925, y: 158), controlPoint2: NSPoint(x: 943, y: 249))
thread.move(to: NSPoint(x: 836, y: 116))
thread.curve(to: NSPoint(x: 958, y: 440), controlPoint1: NSPoint(x: 902, y: 236), controlPoint2: NSPoint(x: 823, y: 330))
thread.move(to: NSPoint(x: 1083, y: 273))
thread.curve(to: NSPoint(x: 958, y: 440), controlPoint1: NSPoint(x: 1008, y: 323), controlPoint2: NSPoint(x: 1030, y: 385))
thread.lineWidth = 3.5
thread.lineCapStyle = .round
signalRed.setStroke()
thread.stroke()

for point in [NSPoint(x: 836, y: 116), NSPoint(x: 1083, y: 273), NSPoint(x: 958, y: 440)] {
  color(0xf2d3b4).setFill()
  NSBezierPath(ovalIn: NSRect(x: point.x - 9, y: point.y - 9, width: 18, height: 18)).fill()
  signalRed.setFill()
  NSBezierPath(ovalIn: NSRect(x: point.x - 7, y: point.y - 7, width: 14, height: 14)).fill()
}

let mono20 = font(["Menlo-Regular", "Monaco"], size: 20)
let mono18 = font(["Menlo-Regular", "Monaco"], size: 18)
let mono17 = font(["Menlo-Regular", "Monaco"], size: 17)
let mono30 = font(["Menlo-Bold", "Monaco"], size: 30, fallbackWeight: .bold)
let display75 = font(["Arial-Black", "Helvetica-Bold"], size: 75, fallbackWeight: .black)
let chinese42 = font(["PingFangTC-Semibold", "HiraginoSans-W6"], size: 42, fallbackWeight: .semibold)

drawText("警察廳・極秘搜查資料", at: NSPoint(x: 65, y: 54), font: mono20, color: color(0xc8c2b5), tracking: 4)
color(0xb63b31).setFill()
NSRect(x: 65, y: 108, width: 82, height: 5).fill()

drawText("BLACK", at: NSPoint(x: 65, y: 142), font: display75, color: color(0xeee6d5), tracking: 1)
drawText("ORGANIZATION", at: NSPoint(x: 65, y: 219), font: display75, color: color(0xeee6d5), tracking: 1)
drawText("黑衣組織機密情報證據板", at: NSPoint(x: 68, y: 332), font: chinese42, color: color(0xded4be), tracking: 5)
drawText("19 EVIDENCE FILES  /  INTERACTIVE RELATION MAP", at: NSPoint(x: 69, y: 402), font: mono18, color: color(0xaaa69d), tracking: 2)

context.saveGraphicsState()
let badgeTransform = NSAffineTransform()
badgeTransform.translateX(by: 822, yBy: 474)
badgeTransform.rotate(byDegrees: -3)
badgeTransform.concat()
let badgeRect = NSRect(x: 0, y: 0, width: 310, height: 105)
color(0x151619, alpha: 0.94).setFill()
let badgePath = NSBezierPath(roundedRect: badgeRect, xRadius: 4, yRadius: 4)
badgePath.fill()
signalRed.setStroke()
badgePath.lineWidth = 3
badgePath.stroke()
drawText("TOP SECRET", at: NSPoint(x: 22, y: 18), font: mono17, color: color(0xbcb8ae), tracking: 3)
drawText("CASE / 4869", at: NSPoint(x: 22, y: 49), font: mono30, color: color(0xeee6d5), tracking: 2)
context.restoreGraphicsState()

color(0xded4be, alpha: 0.22).setStroke()
let border = NSBezierPath(rect: NSRect(x: 19, y: 19, width: 1162, height: 592))
border.lineWidth = 1
border.stroke()

let cornerColor = color(0xb63b31)
drawLine(from: NSPoint(x: 19, y: 72), to: NSPoint(x: 19, y: 19), color: cornerColor, width: 3)
drawLine(from: NSPoint(x: 19, y: 19), to: NSPoint(x: 72, y: 19), color: cornerColor, width: 3)
drawLine(from: NSPoint(x: 1128, y: 19), to: NSPoint(x: 1181, y: 19), color: cornerColor, width: 3)
drawLine(from: NSPoint(x: 1181, y: 19), to: NSPoint(x: 1181, y: 72), color: cornerColor, width: 3)
drawLine(from: NSPoint(x: 19, y: 558), to: NSPoint(x: 19, y: 611), color: cornerColor, width: 3)
drawLine(from: NSPoint(x: 19, y: 611), to: NSPoint(x: 72, y: 611), color: cornerColor, width: 3)
drawLine(from: NSPoint(x: 1128, y: 611), to: NSPoint(x: 1181, y: 611), color: cornerColor, width: 3)
drawLine(from: NSPoint(x: 1181, y: 558), to: NSPoint(x: 1181, y: 611), color: cornerColor, width: 3)

canvas.unlockFocus()

guard
  let tiff = canvas.tiffRepresentation,
  let bitmap = NSBitmapImageRep(data: tiff),
  let png = bitmap.representation(using: .png, properties: [:])
else {
  fatalError("Unable to encode PNG")
}

let rawURL = outputURL.deletingLastPathComponent().appendingPathComponent(".black-org-evidence-board-og@2x.png")
try png.write(to: rawURL, options: .atomic)

let resample = Process()
resample.executableURL = URL(fileURLWithPath: "/usr/bin/sips")
resample.arguments = [
  "--resampleHeightWidth", "630", "1200",
  rawURL.path,
  "--out", outputURL.path,
]
try resample.run()
resample.waitUntilExit()
try? FileManager.default.removeItem(at: rawURL)

guard resample.terminationStatus == 0 else {
  fatalError("sips failed to resize the generated PNG")
}

print("Wrote \(outputURL.path) (1200×630)")
