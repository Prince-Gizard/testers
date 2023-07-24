import * as React from "react"
import { useState } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"

import { data } from "../data"

const isAdmin = data.filter((el) => el.type === "Адм.назначения")
const isAdminTorg = isAdmin.filter((filter) => filter.stage === "Торги СМР")

const isAid = data.filter((el) => el.type === "Здравоохранение")
const isAidTorg = isAid.filter((filter) => filter.stage === "Торги СМР")

const isCulture = data.filter((el) => el.type === "Культура")
const isCultureTorg = isCulture.filter((filter) => filter.stage === "Торги СМР")

const isMinAid = data.filter((el) => el.type === "Минздрав")
const isMinAidTorg = isMinAid.filter((filter) => filter.stage === "Торги СМР")

const isEducation = data.filter((el) => el.type === "Образование")
const isEducationTorg = isEducation.filter(
  (filter) => filter.stage === "Торги СМР",
)

const isSocialProtection = data.filter((el) => el.type === "Соц.защита")
const isSocialProtectionTorg = isSocialProtection.filter(
  (filter) => filter.stage === "Торги СМР",
)

const isSport = data.filter((el) => el.type === "Спорт")
const isSportTorg = isSport.filter((filter) => filter.stage === "Торги СМР")

export default function CollapsibleTable() {
  const [open, setOpen] = useState(false)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Тип</TableCell>
            <TableCell align="right">Проработка территории</TableCell>
            <TableCell align="right">Торги</TableCell>
            <TableCell align="right">ПИР</TableCell>
            <TableCell align="right">СМР</TableCell>
            <TableCell align="right">ВСЕГО</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              Админ
            </TableCell>
            <TableCell align="right">{isAdmin.length}</TableCell>
            <TableCell align="right">{isAdminTorg.length}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{isAdmin.length}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse unmountOnExit in={open} timeout="auto">
                <Box sx={{ margin: 1 }}>
                  <Typography gutterBottom component="div" variant="h6">
                    Подробности
                  </Typography>
                  <Table aria-label="purchases" size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Наталья</TableCell>
                        <TableCell align="right">Скажет</TableCell>
                        <TableCell align="right">Какие</TableCell>
                        <TableCell align="right">Нужны</TableCell>
                        <TableCell align="right">Данные ($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <pre>
                        <code>
                          {JSON.stringify(
                            isAdmin.map((d) => d.id),
                            null,
                            2,
                          )}
                        </code>
                      </pre>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>

          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              Здравоохранение
            </TableCell>
            <TableCell align="right">{isAid.length}</TableCell>
            <TableCell align="right">{isAidTorg.length}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{isAid.length}</TableCell>
          </TableRow>

          {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              Подробности
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Наталья</TableCell>
                    <TableCell align="right">Скажет</TableCell>
                    <TableCell align="right">Какие</TableCell>
                    <TableCell align="right">Нужны</TableCell>
                    <TableCell align="right">Данные ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <pre><code>{JSON.stringify(isAid.map(d=>d.id), null, 2)}</code></pre>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}

          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" />
            </TableCell>
            <TableCell component="th" scope="row">
              Культура
            </TableCell>
            <TableCell align="right">{isCulture.length}</TableCell>
            <TableCell align="right">{isCultureTorg.length}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{isCulture.length}</TableCell>
          </TableRow>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" />
            </TableCell>
            <TableCell component="th" scope="row">
              Минздрав
            </TableCell>
            <TableCell align="right">{isMinAid.length}</TableCell>
            <TableCell align="right">{isMinAidTorg.length}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{isMinAid.length}</TableCell>
          </TableRow>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" />
            </TableCell>
            <TableCell component="th" scope="row">
              Образование
            </TableCell>
            <TableCell align="right">{isEducation.length}</TableCell>
            <TableCell align="right">{isEducationTorg.length}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{isEducation.length}</TableCell>
          </TableRow>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" />
            </TableCell>
            <TableCell component="th" scope="row">
              Соц.защита
            </TableCell>
            <TableCell align="right">{isSocialProtection.length}</TableCell>
            <TableCell align="right">{isSocialProtectionTorg.length}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{isSocialProtection.length}</TableCell>
          </TableRow>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" />
            </TableCell>
            <TableCell component="th" scope="row">
              Спорт
            </TableCell>
            <TableCell align="right">{isSport.length}</TableCell>
            <TableCell align="right">{isSportTorg.length}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{isSport.length}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
