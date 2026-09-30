# 1. Record architecture decisions

Date: at project setup

## Status

Accepted

## Context

Agents and future sessions need the reasoning behind decisions, not just the
code. Without a record, each session re-derives (or contradicts) past choices.

## Decision

Use lightweight ADRs (Architecture Decision Records) in `docs/adr/`. One file
per decision: context, decision, consequences. This directory is part of the
project memory that CLAUDE.md points agents to.

## Consequences

- New conventions get an ADR before they spread.
- Reviewers can ask for an ADR when a change sets a precedent.
- Format follows Michael Nygard's ADR pattern.
