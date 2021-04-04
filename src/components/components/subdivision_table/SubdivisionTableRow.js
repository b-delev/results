import React, { useRef } from 'react';

import { Link } from 'react-router-dom';
import handleViewport from 'react-in-viewport';

import ResultsLine from '../ResultsLine.js';
import SimpleLine from '../SimpleLine';

import styled from 'styled-components';
import { mapNodesType } from '../../ResultUnit.js';

const SubdivisionTableRowStyle = styled.tr`
    ${props => props.type === 'top'? `

        //background-color: #666;
        //color: white;
        font-weight: bold;
        //font-size: 32px;
        text-align: left;

    ` : props.type === 'middle'? `

        text-align: left;
        //background-color: #ddd;
        //padding-left: 80px;

    ` : props.type === 'bottom'? `



    ` : `` }
`;

export default handleViewport(props => {
    const { inViewport, forwardedRef } = props;
    const alreadyLoaded = useRef(false);
    if(inViewport) alreadyLoaded.current = true;
    const shouldLoad = inViewport || alreadyLoaded.current;

    const renderSimpleLine = () => {
        let percentage;
        let tooltipField;
        let tooltipValue;

        if(props.mode === 'turnout') {
            let stats = props.subdivision.stats;
            percentage = (stats.validVotes + stats.invalidVotes) / stats.voters;
            tooltipField = 'Активност';
        } else if(props.mode === 'voters') {
            p
        }

        return(
            <SimpleLine
                percentage={percentage}
                tooltipTitle={props.subdivision.name}
                tooltipField={tooltipField}
                tooltipValue={tooltipValue}
                embed={props.embed}
                thin
            />
        );
    };

    return(
        props.type === 'middle' || props.type === 'top'? [
            <SubdivisionTableRowStyle ref={forwardedRef} style={{opacity: shouldLoad? 1 : 0, transition: 'opacity 1s ease'}} type={props.type}>
                <td colSpan={2} style={{textAlign: 'left', paddingLeft: props.type === 'middle'? '80px' : '20px', paddingRight: 0}}>
                    {props.type === 'top' ? <b>{props.subdivision.name}</b> : props.subdivision.name}
                    
                </td>
            </SubdivisionTableRowStyle>/*,
            props.subdivision.nodes.length <= 1? null :
            <SubdivisionTableRowStyle ref={forwardedRef} style={{opacity: shouldLoad? 1 : 0, transition: 'opacity 1s ease'}} 
                type={props.type === 'top' ? 'middle' : 'bottom'}
            >
                <td style={props.type === 'top'? {fontSize: '28px'} : {}}>
                    <b>Общо ({props.subdivision.nodes.length} {mapNodesType(props.subdivision.nodesType)})</b>
                </td>
                <td style={{borderBottom: '1px solid #ccc', paddingBottom: '10px'}}>
                {
                    props.mode === 'distribution'?
                        <ResultsLine
                            results={props.subdivision.results} 
                            parties={props.parties}
                            totalValid={props.subdivision.totalValid} 
                            totalInvalid={props.subdivision.totalInvalid}
                            firstParty={props.singleParty === ''? null : props.singleParty}
                            embed={props.embed}
                            thin
                        /> :
                        <SimpleLine
                            percentage={props.subdivision.percentage}
                            tooltipTitle={props.subdivision.name}
                            tooltipField={props.subdivision.tooltipField}
                            tooltipValue={props.subdivision.tooltipValue}
                            embed={props.embed}
                            thin
                        />
                }
                </td>
            </SubdivisionTableRowStyle>,*/
        ] :
        <SubdivisionTableRowStyle ref={forwardedRef} style={{opacity: shouldLoad? 1 : 0, transition: 'opacity 1s ease'}} type={props.type}>
            <td>
                {
                    !props.subdivision.segment? props.subdivision.name :
                        <Link to={
                            props.embed
                            ? `/embed/mini-results/${props.subdivision.segment}`
                            : `/${props.subdivision.segment}`
                        }>
                            {props.showNumbers? props.subdivision.number : null} {props.subdivision.name}
                        </Link>
                }
            </td>
            <td>
            {
                props.mode === 'distribution'?
                    <ResultsLine
                        name={props.subdivision.name}
                        results={props.subdivision.results} 
                        parties={props.parties}
                        totalValid={props.subdivision.stats.validVotes} 
                        totalInvalid={props.subdivision.stats.invalidVotes}
                        firstParty={props.singleParty === ''? null : props.singleParty}
                        embed={props.embed}
                        thin
                    /> :
                    <SimpleLine
                        percentage={props.subdivision.percentage}
                        tooltipTitle={props.subdivision.name}
                        tooltipField={props.subdivision.tooltipField}
                        tooltipValue={props.subdivision.tooltipValue}
                        embed={props.embed}
                        thin
                    />
            }
            </td>
        </SubdivisionTableRowStyle>
    );
});