#!/usr/bin/env python3
"""MCP server wrapping ai-dispatch CLI for Hermes/OpenClaw remote execution."""
# /// script
# dependencies = ["mcp"]
# ///

import subprocess
from mcp.server.fastmcp import FastMCP

AI_DISPATCH = "/Users/jino/.local/bin/ai-dispatch"

mcp = FastMCP("ai-dispatch")


@mcp.tool()
def dispatch_submit(
    task: str,
    executor: str = "hermes",
    session: str = "",
    approve_risk: bool = False,
) -> str:
    """
    Submit a task to the remote durable worker (Hermes/OpenClaw on iMac).
    Returns a task_id to track progress.

    executor: hermes (기본) | openclaw (브라우저 자동화) | script (쉘 스크립트)
    session: 세션 이름 (선택)
    approve_risk: 위험 작업 자동 승인
    """
    cmd = [AI_DISPATCH, "submit", task, "--executor", executor]
    if session:
        cmd += ["--session", session]
    if approve_risk:
        cmd.append("--approve-risk")

    result = subprocess.run(cmd, capture_output=True, text=True)
    output = result.stdout.strip()
    if result.returncode != 0:
        return f"ERROR: {result.stderr.strip()}"
    return output


@mcp.tool()
def dispatch_status(task_id: str) -> str:
    """
    Check the status of a submitted task.
    Returns: pending | running | done | failed
    """
    result = subprocess.run(
        [AI_DISPATCH, "status", task_id], capture_output=True, text=True
    )
    output = result.stdout.strip()
    if result.returncode != 0:
        return f"ERROR: {result.stderr.strip()}"
    return output


@mcp.tool()
def dispatch_result(task_id: str) -> str:
    """
    Get the result/output of a completed task.
    Call after dispatch_status returns 'done'.
    """
    result = subprocess.run(
        [AI_DISPATCH, "result", task_id], capture_output=True, text=True
    )
    output = result.stdout.strip()
    if result.returncode != 0:
        return f"ERROR: {result.stderr.strip()}"
    return output


@mcp.tool()
def dispatch_run(task: str, executor: str = "hermes") -> str:
    """
    Route and execute a task immediately (synchronous, waits for completion).
    Use for quick tasks. For long tasks, use dispatch_submit instead.

    executor: hermes | openclaw | script
    """
    result = subprocess.run(
        [AI_DISPATCH, "run", task, "--executor", executor],
        capture_output=True,
        text=True,
        timeout=300,
    )
    output = result.stdout.strip()
    if result.returncode != 0:
        return f"ERROR: {result.stderr.strip()}"
    return output


@mcp.tool()
def dispatch_route(task: str) -> str:
    """
    Print routing decision for a task without executing it.
    Use to preview which executor (hermes/openclaw/script) will handle the task.
    """
    result = subprocess.run(
        [AI_DISPATCH, "route", task], capture_output=True, text=True
    )
    output = result.stdout.strip()
    if result.returncode != 0:
        return f"ERROR: {result.stderr.strip()}"
    return output


if __name__ == "__main__":
    mcp.run()
