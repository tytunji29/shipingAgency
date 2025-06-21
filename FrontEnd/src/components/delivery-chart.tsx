"use client"

import { useEffect, useRef } from "react"

export default function DeliveryChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 100

    // Chart data points (approximated from the image)
    const data = [30, 15, 35, 20, 40, 25, 45, 30, 60, 50, 70]

    // Chart settings
    const padding = 20
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const pointSpacing = chartWidth / (data.length - 1)

    // Draw the line
    ctx.beginPath()
    ctx.moveTo(padding, chartHeight - (data[0] / 70) * chartHeight + padding)

    for (let i = 1; i < data.length; i++) {
      const x = i * pointSpacing + padding
      const y = chartHeight - (data[i] / 70) * chartHeight + padding
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = "#F59E0B"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw x-axis labels
    ctx.fillStyle = "#9CA3AF"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"

    const labels = ["0", "2k", "3k", "4k", "5k", "6k"]
    const labelSpacing = chartWidth / (labels.length - 1)

    for (let i = 0; i < labels.length; i++) {
      const x = i * labelSpacing + padding
      ctx.fillText(labels[i], x, canvas.height)
    }
  }, [])

  return (
    <div className="w-full h-[100px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}

